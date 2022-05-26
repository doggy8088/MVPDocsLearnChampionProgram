// ==UserScript==
// @name         MVP Docs & Learn Champion Program
// @version      1.3
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

    var s = MVPDocsLearnChampionProgram(location.href).add('WT.mc_id', 'DT-MVP-4015686').toString();

    if (s && location.href !== s) {
        history.pushState({}, '', s)
    }

    function MVPDocsLearnChampionProgram(url) {
        const parsedUrl = new URL(url);
        return {
            add(name, value) {
                // https://developer.mozilla.org/en-US/docs/Web/API/URL
                // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
                for (const [key, val] of parsedUrl.searchParams.entries()) {
                    if (key.toLowerCase() == name.toLowerCase()) {
                        parsedUrl.searchParams.delete(key);
                    }
                }
                parsedUrl.searchParams.set(name, value);
                return MVPDocsLearnChampionProgram(parsedUrl.toString());
            },
            toString() {
                return url;
            }
        }
    }
})();