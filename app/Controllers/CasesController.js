import { appState } from "../AppState.js";
import { casesService } from "../Services/CasesService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";

function _drawCases() {
    // ANCHOR don't need this if only calling draw cases with userClearance observer
    // if (!appState.userClearance) {
    //     Pop.error("Please verify your clearance")
    //     return
    // }
    let cases = appState.cases.filter(c => c.agency == appState.userAgency)
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
        appState.on('userAgency', _drawCases)
        appState.on('cases', _drawCases)
        appState.on('case', _drawActive)
    }

    setActive(caseId) {
        casesService.setActive(caseId)
    }

    unredactCase() {
        casesService.unredactCase()
    }

    create() {
        try {
            window.event.preventDefault()
            const form = event.target
            const formData = getFormData(form)
            formData.agency = appState.userAgency
            casesService.create(formData)
            // @ts-ignore
            form.reset()
            // @ts-ignore
            document.querySelector('.report').focus()
        }
        catch (error) {
            Pop.error(error);
        }
    }

    save() {
        let report = document.querySelector('.report')
        // @ts-ignore
        let reportBody = report.value
        casesService.save(reportBody)
    }

}