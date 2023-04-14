import { appState } from "../AppState.js";
import { casesService } from "../Services/CasesService.js";
import { setHTML } from "../Utils/Writer.js";

function _drawCases() {
    let cases = appState.cases
    let template = ''
    cases.forEach(c => template += c.ListTemplate)
    setHTML('caseList', template)
}

function _drawActive() {
    let active = appState.case
    setHTML('active', active.unlocked ? active.UnredactedReportTemplate : active.RedactedReportTemplate)
}

export class CasesController {
    constructor() {
        _drawCases()
        appState.on('case', _drawActive)
    }

    setActive(caseId) {
        casesService.setActive(caseId)
    }

    unredactCase() {
        casesService.unredactCase()
    }

}