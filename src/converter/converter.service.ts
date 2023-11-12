import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as hbs from 'handlebars';
import * as path from 'path';
import { ITask } from 'src/task/interface';
import { Task } from './mock/task';

@Injectable()
export class ConverterService {
    constructor() { }

    /** Uses handlebars to render the html template with the task data */
    taskData = async (tasks: ITask[]) => {
        return await this.renderTemplate(Task(tasks), 'task');
    };

    /** render templtae hbs to html */
    renderTemplate = async (data, templateName) => {
        const html = await fs.readFile(path.join(__dirname, '..', `/views/${templateName}.hbs`), {
            encoding: 'utf-8',
        });
        const template = hbs.compile(html);
        const rendered = template(data, {
            allowProtoPropertiesByDefault: true,
        });
        return rendered;
    };

}