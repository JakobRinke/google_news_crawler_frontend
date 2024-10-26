
const SOURCE_MAP = [
    {
        "name": "Bild",
        "url": "https://www.bild.de/",
        "img_url": "https://lh3.googleusercontent.com/2Kvai383qHt2jsHLPM1WDCnwYHXP3n4r4Z6IoPuzi6sp1bcTgxS4jgXQDLHw6TLVejE0IQI7lA",
        "alignment": "center",
    },

    {
        "name": "Der Spiegel",
        "url": "https://www.spiegel.de/",
        "img_url":  "https://lh3.googleusercontent.com/UbRRcjIhZjHyqs8SkCn43VWw4WLeEs0M0sSI7Aj_miaOn8BTv4uUAmgtoRO1dRC5rzd7zI3JAg",
        "alignment": "left",
    },

    {
        "name": "Frankfurter Allgemeine",
        "url": "https://www.faz.net/",
        "img_url": "https://encrypted-tbn2.gstatic.com/faviconV2?url=https://www.faz.net&client=NEWS_360&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL",
        "alignment": "right",
    },

    {
        "name": "Focus",
        "url": "https://www.focus.de/",
        "img_url": "https://lh3.googleusercontent.com/d2lJae8sK3pEfHlU8-kRUZUAkpqgrEPBpEf9x3AjE1JYEVsd37z3UZRGOOf--BQCGUASSkr8Vw",
        "alignment": "center",

    },
    {
        "name": "Junge Freiheit",
        "url": "https://jungefreiheit.de/",
        "img_url": "https://lh3.googleusercontent.com/ou-0DJCDJGIURXChfE7FNFc1WWafeqI0b1S6zRBfv63u7Yzh5DkDgL39YDTprZbHV88O_DLLXQ",
        "alignment": "right",
    },
    {
        "name": "ntv",
        "url": "https://www.n-tv.de/",
        "img_url": "https://lh3.googleusercontent.com/ou-0DJCDJGIURXChfE7FNFc1WWafeqI0b1S6zRBfv63u7Yzh5DkDgL39YDTprZbHV88O_DLLXQ",
        "alignment": "left",
    },
    {
        "name": "NZZ",
        "url": "https://www.nzz.ch/",
        "img_url": "https://lh3.googleusercontent.com/twlJLcIQBImP-h3sm8oXJMBHSVa2Zyq3xswMUdfG2db_87txTnT2Ckng_9Clxuo-5Yq1QtBKuQ",
        "alignment": "right",
    },
    {
        "name": "t-online",
        "url": "https://www.t-online.de/",
        "img_url": "https://encrypted-tbn1.gstatic.com/faviconV2?url=https://www.t-online.de&client=NEWS_360&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL",
        "alignment": "center",
    },
    {
        "name": "Tagesschau",
        "url": "https://www.tagesschau.de/",
        "img_url": "https://lh3.googleusercontent.com/Xmnc9JkLqD12xnuH1iMi1Y5mFU_erPsP0_e3SvCfzMI3BbNMREm9dlEIdAFbrb4fXsuP0pgOdA",
        "alignment": "center"
    },
    {
        "name": "Zeit",
        "url": "https://www.zeit.de/",
        "img_url": "https://encrypted-tbn0.gstatic.com/faviconV2?url=https://www.zeit.de&client=NEWS_360&size=96&type=FAVICON&fallback_opts=TYPE,SIZE,URL",
        "alignment": "left",
    }
]


function find_source(url) {
    for (let source of SOURCE_MAP) {
        if (url.includes(source.url)) {
            return source
        }
    }
    return null
}