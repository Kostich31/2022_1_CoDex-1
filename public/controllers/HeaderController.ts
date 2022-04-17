import { events } from "@/consts/events";
import { HeaderModel } from "@/models/HeaderModel";
import { HeaderView } from "@/views/HeaderView/HeaderView";
import { BaseController } from "./BaseController";

export class HeaderController extends BaseController {
    constructor() {
        super(HeaderView, HeaderModel);
        this.events.push(
            { 
                event: events.header.changeActiveButton, 
                handler: this.view.changeActiveButton 
            },
            { 
                event: events.auth.gotUser, 
                handler: this.view.renderUserBlock 
            },
            { 
                event: events.auth.changedUser, 
                handler: this.view.renderUserBlock 
            },
            { 
                event: events.auth.notLoggedIn, 
                handler: this.view.renderLoginButton 
            },
            // TODO Адаптивность
            { 
                event: events.router.go, 
                handler: this.model.compareURLWithPath 
            },
            { 
                event: events.header.render.header, 
                handler: this.view.addEventListenerToSearch 
            },
            { 
                event: events.header.render.header, 
                handler: this.view.addEventListenerToResize 
            },
            { 
                event: events.header.render.header, 
                handler: this.view.addEventListenerToVerticalMenu 
            },
        );
        this.subscribe();
    }
}
