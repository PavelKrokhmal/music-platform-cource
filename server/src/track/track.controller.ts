import {Controller, Get} from "@nestjs/common";

@Controller('/tracks')
export class TrackController {
    async create() {

    }

    @Get()
    async getAll() {
        return 'WORK'
    }

    async getOne() {

    }

    async delete() {

    }
}