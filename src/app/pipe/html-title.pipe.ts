import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "htmlTitle" })
export class HtmlTitlePipe implements PipeTransform {
    transform(value: string): string {
        let newStr: string = "";
        let parts = value.split("/");
        let lastPart = parts[parts.length - 1];
        newStr = lastPart.substring(0, lastPart.indexOf(".html"));
        newStr = newStr.replace(/\-/g, " ");
        return newStr;
    }
}
