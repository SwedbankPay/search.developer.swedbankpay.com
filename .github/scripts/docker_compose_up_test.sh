#!/usr/bin/env bash
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

# echo expanded commands as they are executed (for debugging)
enable_expanded_output() {
    if [ $verbose ]; then
        set -o xtrace
        set +o verbose
    fi
}

docker_compose_up_and_test() {
    local url='http://localhost:3000/?q=payment'
    local curl_args=()
    local grep_args=()

    if [ $verbose ]; then
     curl_args+=(--verbose)
    else
     curl_args+=(--silent)
     grep_args+=(--silent)
    fi

    echo 'Starting Docker…'
    docker-compose up --detach
    echo 'Waiting for Developer Portal indexing to complete…'
    (docker-compose logs --follow developer-portal &) | \
        grep --max-count=1 "${grep_args[@]}" "developer.swedbankpay.com exited with code 0" && \
    echo 'Developer portal indexing complete!' && \
    echo 'Waiting for the Search service to become available…' &&
    (docker-compose logs --follow search &) | \
        grep --max-count=1 "${grep_args[@]}" 'Listening on 3000' && \
    echo 'Search service available!' && \
    echo 'Performing search query…' && \
    (curl "${curl_args[@]}" "$url" 2>&1 | grep --max-count=1 "${grep_args[@]}" '<span class=\"h3 mt-3 search-result-title\">After Payment</span>') && \
    echo 'Search query completed successfully.'

    exit_code=$?

    if [ $exit_code -eq 0 ]; then
        echo "Success: The Docker test was completed successfully."
    else
        echo "Failure: The Docker test failed." >&2
    fi

    echo 'Shutting down Docker…'
    docker-compose down

    return $exit_code
}

main() {
    parse_args "$@"
    enable_expanded_output
    docker_compose_up_and_test
}

main "$@"
