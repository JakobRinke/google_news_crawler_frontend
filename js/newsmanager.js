

var NEWS_MANAGER = {}
const NEWS_BASE = "./news_output"
const NEWS_MANAGER_PATH = NEWS_BASE + "/manager.json"

async function load_news_manager() {
    let response = await fetch(NEWS_MANAGER_PATH)
    let data = await response.json()
    NEWS_MANAGER = data
}



async function load_new_from(date, id,) {
    let response = await fetch(NEWS_BASE + "/" + date + "/" + id + ".json")
    let data = await response.json()
    return new News(data, date, id)
}

async function collapse_batch(batch, search, skip, accumulator) {
    batch = await Promise.all(batch)
    for (let n of batch) {
        if (search != "" && !n.overall_summary.toLowerCase().includes(search.toLowerCase())) {
            continue
        }
        if (skip > 0) {
            skip--;
            continue
        }
        accumulator.push(n)
    }
    return skip
}

const BATCH_SIZE = 10
async function load_newest_news(number, skip, search) {
    if (Object.keys(NEWS_MANAGER).length == 0) {
        await load_news_manager()
    }
    var news = []
    var current_batch = []
    // go trough all the dates in reverse order
    for (let date of Object.keys(NEWS_MANAGER).reverse()) {
        let news_ids = NEWS_MANAGER[date]
        for (let id of news_ids.reverse()) {
            current_batch.push(load_new_from(date, id))
            if (current_batch.length >= BATCH_SIZE) {
                skip = await collapse_batch(current_batch, search, skip, news)
                current_batch = []
            }
            if (news.length >= number) {
                return news.slice(0, Math.min(number, news.length))
            }
        }
    }
    if (current_batch.length > 0) {
        await collapse_batch(current_batch, search, skip, news)
    }
    return news.slice(0, Math.min(number, news.length))
}



class Source {
    constructor(source_json) {
        this.url = source_json.url
        this.text = source_json.text.replace("\\n", "\n").replace("\n", "<br>")
        this.summary = source_json.summary.replace("\\n", "\n").replace("\n", "<br>")
        const src_data = find_source(this.url)
        this.name = src_data.name
        this.img = src_data.img_url
        this.alignment = src_data.alignment
        this.src_url = src_data.url
    }
}

class News {
    constructor(news_json, date, id) {
        this.date = date
        this.id = id
        this.url = news_json.url
        this.img = news_json.img
        this.overall_summary = news_json.overall_summary.replace("\\n", "\n").replace("\n", "<br>")
        
        this.sources = [];
        for (let source_json of news_json.sources) {
            try {
                this.sources.push(new Source(source_json))
            } catch (e) {
            }
        }
        // remove duplicates by name
        this.sources = this.sources.filter((s, i, a) => a.findIndex(t => (t.name === s.name)) === i)


        this.title = this.overall_summary.split("\n")[0]
            .replace("## Zusammenfassung der", "")
            .replace("## Zusammenfassung des", "")
            .replace("## Zusammenfassung", "");
        
        if (this.title.endsWith(":")) {
            this.title = this.title.substring(0, this.title.length - 1)
        }

   

        // limit the title to 50 characters
        this.title = this.title.length > 100 ? this.title.substring(0, 100) + "..." : this.title

        this.left_sources = this.sources.filter(s => s.alignment == "left")
        this.right_sources = this.sources.filter(s => s.alignment == "right")
        this.center_sources = this.sources.filter(s => s.alignment == "center")

        this.left_coverage_pc = this.left_sources.length / this.sources.length * 100
        this.right_coverage_pc = this.right_sources.length / this.sources.length * 100
        this.center_coverage_pc = this.center_sources.length / this.sources.length * 100

    }
}



load_news_manager()