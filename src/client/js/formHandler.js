import { validateURL } from './urlValidator.js'

async function handleSubmit(event) {
    event.preventDefault()
    console.log("::: Form Submitted :::")
    const formText = document.getElementById('name').value
    if (validateURL(formText)) {
        const options = {
            method: "GET",
            credentials : "same-origin",
            headers: {
                "Content-Type": "application/json"
            }
        }
        const response = await fetch(`http://localhost:3000/sentimentAnalysis?article=${formText}`, options)
        const analysisResult = await response.json()
        const resultsSection = document.querySelector("section#resultsSection");
        console.log(analysisResult)
        if (analysisResult.status.code === "0") {
            const {score_tag, agreement, subjectivity, confidence} = analysisResult;
            if (score_tag.includes("N")) {
                resultsSection.className = "negative"
            } else if (score_tag.includes("P")) {
                resultsSection.className = "positive"
            } else {
                resultsSection.className = "neutral"
            }
            document.querySelector("p#results").textContent = `This article is a ${subjectivity.toLowerCase()} ${agreement.toLowerCase()} with polarity ${score_tag}
    I'm confident of my results with a percentage of ${confidence}%`
        } else {
            resultsSection.className = "error"
            document.querySelector("p#results").innerHTML = analysisResult.status.msg
        }
    } else {
        resultsSection.className = "error"
        document.querySelector("p#results").innerHTML = "Entered URL is invalid!"
    }
}

export { handleSubmit }
