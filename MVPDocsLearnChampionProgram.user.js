// ==UserScript==
// @name         MVP Docs & Learn Champion Program
// @version      1.1
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
// @match        *://blogs.technet.microsoft.com/*
// @match        *://microsoft.com/handsonlabs/*
// @match        *://blogs.windows.com/*
// @run-at       document-start
// ==/UserScript==

(function() {

    var s = MVPDocsLearnChampionProgram(location.href)
    .add('WT.mc_id', 'DT-MVP-4015686')
    .toString();

    if (s && location.href !== s) {
        location.href = s;
    }

    function MVPDocsLearnChampionProgram(url) {

        return {
            add(name, value) {
                var [path, ...other] = url.split('?');
                other = other.join('?');

                var [query, ...hash] = other ? other.split('#') : [query, ''];
                hash = hash.join('#');

                let new_query = [];
                for (let param of (query ? query : '').split('&')) {
                    let [key, val] = param.split('=', 2);
                    if (key !== name) {
                        new_query.push(param);
                    }
                }

                if (query) {
                    new_query.push(name + '=' + value);
                    query = new_query.join('&');
                } else {
                    query = name + '=' + value;
                }

                query = query ? query = '?' + query : '';
                hash = hash ? hash = '#' + hash : '';

                return MVPDocsLearnChampionProgram(path + query + hash);
            },
            toString() {
                return url;
            }
        }
    }
})();