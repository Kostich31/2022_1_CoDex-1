import { events } from "../consts/events.js";
import { getActor } from "../modules/connection.js";
import { statuses } from "../consts/statuses.js";

/**
 * @description Класс модели страницы актёра.
 */
export class ActorModel {
    /**
     * @description Создаёт модель страницы актёра.
     * @param { EventBus } eventBus Глобальная шина событий
     */
    constructor(eventBus) {
        this.eventBus = eventBus;
    }

    /**
     * @description Получает информацию для контента страницы 
     * актёра.
     * @param { object } actor Информация об актёре: 
     * имя, ID, фильмография...
     */
    getContent = (actor) => {
        if (!actor?.ID) {
            this.eventBus.emit(events.app.errorPage);
            return;
        }
        getActor(actor.ID)
        .then((response) => {
            if (!response || !response.status) {
                this.eventBus.emit(events.app.errorPage);
            } else if (response.status === statuses.OK && response.parsedResponse) {
                this.eventBus.emit(events.actorPage.render.content, response.parsedResponse);
            }
            if (response.status === statuses.NOT_FOUND) {
                this.eventBus.emit(events.app.errorPageText, "Такого фильма нет :/");
            }
        });
    }
}