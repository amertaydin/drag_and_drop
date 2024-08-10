"use strict";
class ProjectInput {
    constructor() {
        this.templateElement = (document.getElementById("project-input"));
        this.hostElement = document.getElementById("app");
        const importednode = document.importNode(this.templateElement.content, true);
        this.element = importednode.firstElementChild;
        this.attach();
    }
    attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }
}
const prjInput = new ProjectInput();
//# sourceMappingURL=app.js.map