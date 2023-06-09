import { appState } from "../AppState.js"
import { generateId } from "../Utils/generateId.js"

export class Case {
  constructor(data) {
    this.id = data.id || generateId()
    this.report = data.report || "Fill out report"
    this.clearance = data.clearance
    // REVIEW perhaps the user casts this property as well?
    this.agency = data.agency
    this.date = data.date ? new Date(data.date) : new Date()
    // REVIEW just get rid of this property if we are now just going to handle unlocking with the clearanceLevel and user??
    this.unlocked = false
  }

  get ListTemplate() {
    return `
            <div class="d-flex justify-content-between selectable" onclick="app.casesController.setActive('${this.id}')">
            <p>${this.ComputeTitle}</p>
            <p>${this.ComputeDate}</p>
          </div>`
  }

  get UnredactedReportTemplate() {
    return `
        <div class="col-8">
              <h1>${this.clearance}</h1>
              <h3>${this.agency}</h3>
            </div>
            <div class="col-4 text-end">
              <button class="btn btn-info" onclick="app.casesController.save()"><i class="mdi mdi-content-save"></i></button>
            </div>
            <div class="col-12">
              <p>${this.ComputeDate}</p>
            </div>

            <textarea name="report" id="report" class="report" cols="30"
              rows="10">${this.report}</textarea>`
  }


  get RedactedReportTemplate() {
    return `
        <div class="col-8">
              <h1>${this.clearance}</h1>
              <h3>${this.agency}</h3>
            </div>
            <div class="col-4 text-end">
              <button class="btn btn-info" onclick="app.casesController.unredactCase()"><i class="mdi mdi-eye"></i></button>
            </div>
            <div class="col-12">
              <p>${this.ComputeDate}</p>
            </div>

            <textarea name="report" id="report" cols="30"
              rows="10">${this.ComputeRedactedReport}</textarea>`
  }
  get ComputeTitle() {
    return this.report.slice(0, 15) + '...'
  }

  get ComputeDate() {
    let date = this.date
    return (date.getMonth() + 1) + '/' + (date.getDate()) + '/' + (date.getFullYear())
  }

  get ComputeRedactedReport() {
    // let words = appState.classifiedWords
    let origReportArr = this.report.split(' ')
    let redactedReportArr = origReportArr.map(word => {
      if (appState.classifiedWords.includes(word.toLowerCase())) {
        return '◼️◼️◼️◼️'
      } else {
        return word
      }
    })

    return redactedReportArr.join(' ')
  }

}