export class Status {
    constructor(status, result) {

        this.status = status;
        if (status == 200) {
            this.result = result;
        } else {
            this.error = result;
        }
    }

    static OK(result) {
        return new Status(200, result);
    }

    static sendOK(res, result) {
        res.status = 200;
        res.send(new Status(200, result));
    }

    static sendError(res, status, result) {
        res.status = status;
        res.send(new Status(status, result));
    }

    static Error(status, description) {
        return new Status(status, description);
    }

    get Status() {
        return this.status;
    }

    get Description() {
        return this.description;
    }

    get Ok() {
        return this.status == 200;
    }
}
