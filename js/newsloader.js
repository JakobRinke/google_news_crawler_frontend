
const URL_PARAMS = new URLSearchParams(window.location.search)


const search = URL_PARAMS.get("search") || ""
document.getElementById("search").value = search

const SOURCE_PREFAB = '<a href="URL" target="_blank"><img src="IMG_URL" alt="NAME" class="source-image"></a>'

const NEWS_DIV = document.getElementById("Nachrichten")

const NEWS_PREFAB = NEWS_DIV.innerHTML
NEWS_DIV.innerHTML = ""


const loadNum = 10;

var loaded = 0;
var maxed_out = false;

async function load_and_store_news() {
    let news = await load_newest_news(loadNum, loaded, search)
    news = await Promise.all(news)
    for (let n of news) {
        var child = NEWS_PREFAB;
        child = child.replaceAll("ID", n.id)
        child = child.replaceAll("DATE", n.date)
        child = child.replaceAll("IMG", n.img)
        child = child.replaceAll("TITLE", n.title)
        child = child.replaceAll("URL", n.url)
        child = child.replaceAll("OVERALL_SUMMARY", n.overall_summary)
        child = child.replaceAll("L_COVER", n.left_coverage_pc);
        child = child.replaceAll("R_COVER", n.right_coverage_pc);
        child = child.replaceAll("C_COVER", n.center_coverage_pc);
        
        var sources = "";
        var done_sources = [];
        for (let s of n.sources) {
            if (done_sources.includes(s.name)) {
                continue
            }
            sources += SOURCE_PREFAB
            sources = sources.replaceAll("IMG_URL", s.img)
            sources = sources.replaceAll("URL", s.url)
            sources = sources.replaceAll("NAME", s.name)
            done_sources.push(s.name)
        }
        child = child.replaceAll("SOURCES", sources)

        NEWS_DIV.innerHTML += child
        loaded++;
    }
} 


function load_more() {
    if (maxed_out) {
        return;
    }
    var before = loaded;
    load_and_store_news();
    if (before == loaded) {
        maxed_out = true;
        document.getElementById("load_more").style.display = "none";
    }
}


load_and_store_news()