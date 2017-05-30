"use strict";
const autoTunnel = require("./");
const expect = require("chai").expect;

const argv = process.argv;
const env = process.env;



beforeEach( function()
{
	process.argv = Object.assign({}, argv);
	process.env  = Object.assign({}, env);
});



it("httpOverHttp", function()
{
	process.env.HTTP_PROXY = "http://proxy/";
	expect( autoTunnel("http://website/") ).to.be.an("object");
});



it("httpOverHttps", function()
{
	process.env.ALL_PROXY = "https://proxy/";
	expect( autoTunnel("http://website/") ).to.be.an("object");
});



it("httpsOverHttp", function()
{
	process.env.ALL_PROXY = "http://proxy/";
	expect( autoTunnel("https://website/") ).to.be.an("object");
});



it("httpsOverHttps", function()
{
	process.env.HTTPS_PROXY = "https://proxy/";
	expect( autoTunnel("https://website/") ).to.be.an("object");
});



it("supports NO_PROXY", function()
{
	process.env.ALL_PROXY = "http://proxy/";
	process.env.HTTP_PROXY = "http://proxy/";
	process.env.HTTPS_PROXY = "https://proxy/";
	process.env.NO_PROXY = "*";
	expect( autoTunnel("http://website/") ).to.be.undefined;
	expect( autoTunnel("https://website/") ).to.be.undefined;
});



it("supports a config", function()
{
	const proxyHeaders = { key:"value" };
	const proxyUrl = "https://proxy/";

	process.env.HTTP_PROXY = "http://proxy/";

	expect( autoTunnel("http://website/", { proxyUrl }) ).to.be.an("object");
	expect( autoTunnel("http://website/", { proxyHeaders }) ).to.be.an("object");
	expect( autoTunnel("http://website/", { proxyHeaders, proxyUrl }) ).to.be.an("object");
});
