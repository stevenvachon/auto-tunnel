"use strict";
const getProxyForUrl = require("proxy-from-env").getProxyForUrl;
const tunnel = require("tunnel-agent");
const URL = require("universal-url").URL;

//const agents = {};
const proxies = {};



function authString(url)
{
	if (url.username!=="" || url.password!=="")
	{
		return `${url.username}:${url.password}`;
	}
}



// TODO :: https://github.com/koichik/node-tunnel/issues/20
function autoTunnel(url, config)
{
	if (typeof url === "string")
	{
		url = new URL(url);
	}

	const proxyUrl = getParsedProxy( config && config.proxyUrl || getProxyForUrl(url) );

	if (proxyUrl !== null)
	{
		/*if (agents[proxyUrl.href] === undefined)
		{
			agents[proxyUrl.href] = {};
		}

		if (agents[proxyUrl.href][url.protocol] !== undefined)
		{
			return agents[proxyUrl.href][url.protocol];
		}
		else
		{*/
			// Remove trailing ":"
			const proxyUrl_protocol = proxyUrl.protocol.slice(0, -1);
			const url_protocol = url.protocol.slice(0, -1);

			const agent = tunnel[`${url_protocol}Over${capitalizeFirstLetter(proxyUrl_protocol)}`](
			{
				proxy:
				{
					headers: config && config.proxyHeaders,
					host: proxyUrl.hostname,
					port: proxyUrl.port,
					proxyAuth: authString(proxyUrl)
				}
			});

			return /*agents[proxyUrl.href][url.protocol] =*/ agent;
		//}
	}
}



function capitalizeFirstLetter(string)
{
	return string.charAt(0).toUpperCase() + string.slice(1);
}



// TODO :: let throw if not "" ?
function getParsedProxy(url)
{
	if (proxies[url] === undefined)
	{
		try
		{
			proxies[url] = new URL(url);
		}
		catch (error)
		{
			proxies[url] = null;
		}
	}

	return proxies[url];
}



module.exports = autoTunnel;
