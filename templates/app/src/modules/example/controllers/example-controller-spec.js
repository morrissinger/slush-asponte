describe('exampleController', () => {

	it('has a test that passes', (done) => {
		expect(window.foo()).to.equal('bar');
		done();
	});

	it('has a test that fails', (done) => {
		done();
	});

});