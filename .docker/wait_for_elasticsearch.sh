#!/bin/bash
set -o errexit # Abort if any command fails
me=$(basename "$0")

help_message="\
Launch a Docker Compose and test its output.

Usage:
  $me [--verbose]
  $me --help

Arguments:
  -h, --help                Displays this help screen.
  -v, --verbose             Increase verbosity. Useful for debugging."

parse_args() {
    while : ; do
        if [[ $1 = "-h" || $1 = "--help" ]]; then
            echo "$help_message"
            return 0
        elif [[ $1 = "-v" || $1 = "--verbose" ]]; then
            verbose=true
            shift
        else
            break
        fi
    done
}

# Echo expanded commands as they are executed (for debugging)
enable_expanded_output() {
    if [ $verbose ]; then
        set -o xtrace
        set +o verbose
    fi
}

is_ready() {
    [ "$(curl --write-out '%{http_code}' --silent --output /dev/null "$ELASTICSEARCH_URL"/_cat/health?h=st)" = 200 ]
}

wait() {
    echo "$(date) - Checking whether <$ELASTICSEARCH_URL> is ready..."

    i=0
    while ! is_ready; do
        i=$((i + 1))
        sleep_interval=5

        if [ "$i" -ge 120 ]; then
            waited=$((i * sleep_interval))
            echo "$(date) - <$ELASTICSEARCH_URL> not ready after $waited seconds. Giving up!"
            exit 1
        fi
        echo "$(date) - waiting for <$ELASTICSEARCH_URL> to be ready."
        sleep $sleep_interval
    done

    echo "$(date) - Done checking for <$ELASTICSEARCH_URL>."
}

start() {
    echo "$(date) - Running the Developer Portal in $JEKYLL_ENV."

    if [ $verbose ]; then
        echo "The contents of <$(pwd)> is:"
        find .
    fi

    cp -r "${JEKYLL_SITE_DIR}/*" "${JEKYLL_DATA_DIR}/"

    exec "${JEKYLL_VAR_DIR}/entrypoint/sh/entrypoint.sh" build
}


main() {
    parse_args "$@"
    enable_expanded_output
    wait
    start
}

main "$@"
