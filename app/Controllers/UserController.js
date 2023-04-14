import { userService } from "../Services/UserService.js";
import { Pop } from "../Utils/Pop.js";

export class UserController {
    constructor() {
        this.verifyClearance()
    }

    async verifyClearance() {
        let input = await Pop.prompt("Please enter you clearance level")
        if (!input) return
        userService.verifyClearance(input)
    }

}