import { appState } from "../AppState.js"
import { Case } from "../Models/Case.js"
import { saveState } from "../Utils/Store.js"

function _saveCases() {
    saveState('cases', appState.cases)
}

class CasesService {

    unredactCase() {
        let active = appState.case
        active.unlocked = !active.unlocked
        appState.emit('case')
    }

    setActive(caseId) {
        let foundCase = appState.cases.find(c => c.id == caseId)
        appState.case = foundCase
    }
    create(formData) {
        let newCase = new Case(formData)
        appState.cases.push(newCase)
        _saveCases()
        newCase.unlocked = true
        appState.case = newCase
        appState.emit('cases')
    }

    save(reportBody) {
        let active = appState.case
        active.report = reportBody
        active.unlocked = false
        appState.emit('case')
        _saveCases()
    }
}

export const casesService = new CasesService()