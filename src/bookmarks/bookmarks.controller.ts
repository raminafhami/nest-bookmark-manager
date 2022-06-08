import { Controller, Get, Post, Body } from '@nestjs/common';
import { url } from 'inspector';
import { Bookmark } from './bookmark.model';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto } from './dto/create-bookmart.dto';

@Controller('bookmarks')
export class BookmarksController {
    constructor(private bookmarksService: BookmarksService) {}
    
    @Get()
    findAll(): Bookmark[] {
        return this.bookmarksService.findAll();
    }

    @Post()
    createBookmark(@Body() createBookmarkDto: CreateBookmarkDto): Bookmark {
        return this.bookmarksService.createBookmark(createBookmarkDto);        
    }
}