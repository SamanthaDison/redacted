import { appState } from "../AppState.js";
import { casesService } from "../Services/CasesService.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";

function _drawCases() {
    // ANCHOR don't need this if only calling draw cases with userClearance observer
    // if (!appState.userClearance) {
    //     Pop.error("Please verify your clearance")
    //     return
    // }
    let cases = appState.cases.filter(c => c.clearance == appState.userClearance)
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
        // _drawCases()
        appState.on('userClearance', _drawCases)
        appState.on('case', _drawActive)
    }

    setActive(caseId) {
        casesService.setActive(caseId)
    }

    unredactCase() {
        casesService.unredactCase()
    }

}