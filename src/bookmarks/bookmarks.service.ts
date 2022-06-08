import { Injectable } from '@nestjs/common';
import { Bookmark } from './bookmark.model';
import { v4 as uuid } from 'uuid';
import { CreateBookmarkDto } from './dto/create-bookmart.dto';
import { GetBookmarkDto } from './dto/get-bookmark.dto';

@Injectable()
export class BookmarksService {
    private bookmarks: Bookmark[] = []; 

    findAll(): Bookmark[] {
        return this.bookmarks;
    }

    find(getBookmarkDto: GetBookmarkDto): Bookmark[] {
        let bookmarks = this.findAll();

        const { url, description } = getBookmarkDto;
        if (url) {
            bookmarks = this.bookmarks.filter(x => x.url.toLocaleLowerCase().includes(url))
        };

        if (description) {
            bookmarks = bookmarks.filter(x => x.description.toLocaleLowerCase().includes(description))
        }

        return bookmarks;
    }

    findById(id: string): Bookmark {
        return this.bookmarks.find(x => x.id === id)
    }

    createBookmark(createBookmarkDto: CreateBookmarkDto): Bookmark {
        const { url, description } = createBookmarkDto;
        const bookmark: Bookmark = {
            id: uuid(),
            url,
            description
        };

        this.bookmarks.push(bookmark);
        return bookmark;
    }

    deleteBookmark(id: string): void {
        this.bookmarks = this.bookmarks.filter(x => x.id !== id);
    }

    updateBookmarkDescription(id: string, description: string, ): Bookmark {
        const bookmark = this.findById(id);

        bookmark.description = description;

        return bookmark;
    }
}
