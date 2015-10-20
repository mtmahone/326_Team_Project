// ADDITION
// This an example of a test suite for an HTML document.

suite("Global Tests", function () {
	test('page has a valid title', function () {
		assert(
			// The document has a title
			document.title &&
			// and the title is non-empty
			document.title.match(/\S/) &&
			// and the title is not TODO
			document.title.toUpperCase() !== 'TODO'
		);
	});
});