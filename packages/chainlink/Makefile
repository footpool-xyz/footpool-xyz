current-dir := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))

.PHONY: chainlink-results
chainlink-results:
	node request.js -s setMatchesWithResults -n opSepolia

.PHONY: chainlink-matches
chainlink-matches:
	node request.js -s setMatches -n opSepolia
