import { appState } from "../AppState.js"
import { Pop } from "../Utils/Pop.js"

class UserService {
    verifyClearance(input) {
        // REVIEW show off a for loop?

        for (const key in appState.clearanceLevels) {
            if (appState.clearanceLevels[key] == input) {
                Pop.toast("VERIFIED")
                // ANCHOR set the clearance to the key to facilliate the filter of cases
                appState.userClearance = key
                return
            }
        }
        Pop.error("Get out poser")

    }

    // ANCHOR super simplfied version....
    //     if(appState.clearanceLevels[input]) {
    //         appState.userClearance = input
    //     } else {
    //     Pop.error("Get out poser")
    // }
    //     }


}

export const userService = new UserService()