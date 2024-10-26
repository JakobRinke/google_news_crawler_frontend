
const URL_PARAMS = new URLSearchParams(window.location.search)
const ID = URL_PARAMS.get("id")
const DATE = URL_PARAMS.get("date")
const NEWS_CONTAINER = document.getElementById("news")
const NEWS_PREFAB = NEWS_CONTAINER.innerHTML
NEWS_CONTAINER.innerHTML = ""

const SOURCE_IMG_PREFAB = '<img src="IMG_URL" alt="NAME" class="source-image-large">'

const SOURCE_PREFAB = `
<article>
    <details>
        <summary>
            <div class="grid">
                SOURCE_IMG
                <div class="src-container">
                    <h3>TITLE</h3>
                </div>
            </div>
        </summary>
        <p>
            SOURCE_CONTENT
        </p>
        <a href="SOURCE_URL" target="_blank">Mehr Lesen</a>
    </details>
</article>
`;

async function load_and_show() {
    var n = await load_new_from(DATE, ID);
    var child = NEWS_PREFAB;
    child = child.replaceAll("ID", n.id)
    child = child.replaceAll("DATE", n.date)
    child = child.replaceAll("IMG", n.img)
    child = child.replaceAll("TITLE", n.title)
    child = child.replaceAll("URL", n.url)
    child = child.replaceAll("OVERALL_SUMMARY", marked.parse(n.overall_summary))
    child = child.replaceAll("L_COVER", n.left_coverage_pc);
    child = child.replaceAll("R_COVER", n.right_coverage_pc);
    child = child.replaceAll("C_COVER", n.center_coverage_pc);

    child = child.replaceAll("LEFT_SOURCES", load_sources_html(n.left_sources))
    child = child.replaceAll("RIGHT_SOURCES", load_sources_html(n.right_sources))
    child = child.replaceAll("CENTER_SOURCES", load_sources_html(n.center_sources))

    NEWS_CONTAINER.innerHTML = child

}

function load_sources_html(sources) {
    var done_sources = []
    var srcs = "";
    for (let s of sources) {
        if (done_sources.includes(s.name)) {
            continue
        }
        var source = SOURCE_PREFAB;
        source = source.replaceAll("IMG_URL", s.img);
        source = source.replaceAll("NAME", s.name)
        source = source.replaceAll("SOURCE_CONTENT", marked.parse(s.summary))
        source = source.replaceAll("SOURCE_URL", s.src_url)
        source = source.replaceAll("URL", s.url)
        source = source.replaceAll("TITLE", s.name)
        var img = SOURCE_IMG_PREFAB;
        img = img.replaceAll("IMG_URL", s.img)
        img = img.replaceAll("URL", s.url)
        img = img.replaceAll("NAME", s.name)
        source = source.replaceAll("SOURCE_IMG", img)
        srcs += source
        done_sources.push(s.name)
    }
    return srcs
}


load_and_show();