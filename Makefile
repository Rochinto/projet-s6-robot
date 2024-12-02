NODE_FLAG=node
ORIGIN_FOLDER2=./src/src2
TESTING_FOLDER2=./tst/tst2
HTML_FILES=./testing_html
REPOSITORY=./
tests: export test1_puzzle test2_robot test3_stack test4_interpreter test_html test_html2 test_coverage clean
test_coverage:
	source ~/.bashrc
	npx_jest_coverage
display_report: ${REPOSITORY}/Rapport_projet_Robozzle.pdf
	evince $^
export: export.sh
	chmod 777 *.sh
	./$^
test1_puzzle: ${TESTING_FOLDER2}/puzzle_test.js
	$(NODE_FLAG) $<
test2_robot: ${TESTING_FOLDER2}/robot_test.js
	$(NODE_FLAG) $<
test3_stack: ${TESTING_FOLDER2}/stack_test.js
	$(NODE_FLAG) $<
test4_interpreter: ${TESTING_FOLDER2}/interpreter_test.js
	$(NODE_FLAG) $<
test_html: 
	firefox visualisation1.html
test_html2:
	firefox visualisation2.html
clean:
	rm -f Makefile~ *.json *.json~ *.js~ src/*.js~ tst/*.js~ src/src2/*.js~ tst/tst2/*.js~ *.html~
