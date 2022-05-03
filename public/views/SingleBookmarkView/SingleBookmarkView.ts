import { singleBookmarkPageData } from '@/types';
import EventBus from '@/modules/eventBus';
import { events } from '@/consts/events';
import { getURLArguments } from '@/modules/router';
import { BaseView } from '../BaseView/BaseView';
import singleBookmarkContent from '@/components/singleBookmark/singleBookmark.pug';

/**
 * @description Класс представления страницы одной закладки.
 */
export class SingleBookmarkView extends BaseView {
    private bookmarkData: singleBookmarkPageData;
    private bookmarkID: string;
    /**
       * @description Создаёт представление страницы одной закладки.
       * @param { EventBus } eventBus Глобальная шина событий
       * @param { Object } data Данные, необходимые для создания представления
       */
    constructor(eventBus: EventBus, { data = {} } = {}) {
        super(eventBus, data);
        this.bookmarkID = "";
    }

    /**
       * @description Отправляет на глобальную шину событий событие отрисовки
       * контента страницы.
       */
    emitGetContent = () => {
        const URLArgs = getURLArguments(window.location.pathname, '/bookmarks/:ID');
        this.bookmarkID = URLArgs.ID;
        this.eventBus.emit(events.singleBookmarkPage.getContent, URLArgs);
    };

    /**
       * @description Отрисовывает контент страницы одной закладки.
       * @param { Object } data Данные для отрисовки контента закладки:
       * название подборки, даннные о фильмах
       */
    renderContent = (data: singleBookmarkPageData) => {
        console.log(data)
        const template = singleBookmarkContent(data);
        this.bookmarkData = data;
        console.log("bookmarkData", this.bookmarkData)
        const content = document.querySelector('.content');
        if (content) {
            content.innerHTML = template;
        } else {
            this.eventBus.emit(events.app.errorPage);
        }
        this.addEventListenerToDeleteButtons();
    };

    addEventListenerToDeleteButtons = ()=>{
        const deletePlaylistButton = document.querySelector('.container__bookmark-settings__delete-playlist-btn') as HTMLInputElement;
        if(!deletePlaylistButton){return;}

        deletePlaylistButton.addEventListener('click', (e)=>{
            e.preventDefault();
            console.log("click delete")
            console.log("bookmarkID",this.bookmarkID)
            this.eventBus.emit(events.singleBookmarkPage.delete.bookmark, {bookmarkId : this.bookmarkID});
        });
    }
}
