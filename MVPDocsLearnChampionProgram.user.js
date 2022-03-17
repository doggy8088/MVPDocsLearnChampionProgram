// ==UserScript==
// @name         MVP Docs & Learn Champion Program
// @version      1.2
// @description  Add WT.mc_id=DT-MVP-4015686 to the matched urls
// @license      MIT
// @homepage     https://blog.miniasp.com/
// @homepageURL  https://blog.miniasp.com/
// @website      https://www.facebook.com/will.fans
// @source       https://github.com/doggy8088/MVPDocsLearnChampionProgram
// @namespace    https://github.com/doggy8088/MVPDocsLearnChampionProgram
// @author       Will Huang
// @match        *://docs.microsoft.com/*
// @match        *://social.technet.microsoft.com/*
// @match        *://azure.microsoft.com/*
// @match        *://techcommunity.microsoft.com/*
// @match        *://social.msdn.microsoft.com/*
// @match        *://devblogs.microsoft.com/*
// @match        *://developer.microsoft.com/*
// @match        *://channel9.msdn.com/*
// @match        *://gallery.technet.microsoft.com/*
// @match        *://cloudblogs.microsoft.com/*
// @match        *://technet.microsoft.com/*
// @match        *://docs.azure.cn/*
// @match        *://www.azure.cn/*
// @match        *://msdn.microsoft.com/*
// @match        *://blogs.msdn.microsoft.com/*
// @match        *://blogs.microsoft.com/*
// @match        *://blogs.technet.microsoft.com/*
// @match        *://microsoft.com/handsonlabs/*
// @match        *://blogs.windows.com/*
// @match        *://dotnet.microsoft.com/*
// @match        *://info.microsoft.com/*
// @run-at       document-start
// ==/UserScript==

(function() {

    var s = MVPDocsLearnChampionProgram(location.href)
    .add('WT.mc_id', 'DT-MVP-4015686')
    .toString();

    if (s && location.href !== s) {
        //location.href = s;
        history.pushState('', document.title, s)
    }

    function MVPDocsLearnChampionProgram(url) {

        return {
            add(name, value) {
                var query,
                    // https://developer.mozilla.org/en-US/docs/Web/API/URL
                    currURL = new URL(url),
                    // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
                    searchParams = new URLSearchParams(currURL.search),
                    newURLSearchParams = new URLSearchParams();

                for (const [key, val] of searchParams.entries()) {
                    if (key.toLowerCase() == name.toLowerCase()) {
                    } else {
                        newURLSearchParams.set(key, val);
                    }
                }

                newURLSearchParams.set(name, value);

                return MVPDocsLearnChampionProgram(`${currURL.protocol}//${currURL.host}${currURL.pathname}?${newURLSearchParams.toString()}${currURL.hash}`);
            },
            toString() {
                return url;
            }
        }
    }
})();
