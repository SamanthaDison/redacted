import { appState } from "../AppState.js"

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

}

export const casesService = new CasesService()