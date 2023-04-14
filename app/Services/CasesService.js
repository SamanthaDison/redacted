import { appState } from "../AppState.js"

class CasesService {
    setActive(caseId) {
        let foundCase = appState.cases.find(c => c.id == caseId)
        appState.case = foundCase
    }

}

export const casesService = new CasesService()