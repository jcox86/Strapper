//
// test/midway/appSpec.js
//
describe("Midway: Testing Modules", function () {
    describe("App Module:", function () {

        var module;
        before(function () {
            module = angular.module("app");
        });

        it("should be registered", function () {
            expect(module).not.to.equal(null);
        });

        describe("Dependencies:", function () {

            var deps;
            var hasModule = function (m) {
                return deps.indexOf(m) >= 0;
            };
            before(function () {
                deps = module.value('appName').requires;
            });

            //you can also test the module's dependencies
            it("should have App.Controllers as a dependency", function () {
                expect(hasModule('app.Controllers')).to.equal(true);
            });

            it("should have App.Directives as a dependency", function () {
                expect(hasModule('app.Directives')).to.equal(true);
            });

            it("should have App.Filters as a dependency", function () {
                expect(hasModule('app.Filters')).to.equal(true);
            });

            it("should have App.Routes as a dependency", function () {
                expect(hasModule('app.Routes')).to.equal(true);
            });

            it("should have App.Services as a dependency", function () {
                expect(hasModule('app.Services')).to.equal(true);
            });
        });
    });
});