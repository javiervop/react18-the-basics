import apiClient from "./api-client";

interface Entity {
    id: number;
}

class HttpService {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint
    }

    getAll<T>() {
        const controller = new AbortController();
        const request = apiClient
        // get => promise => resp / err
        .get<T[]>("/users", {
          signal: controller.signal,
        })
        // .finally(() => {
        //  setLocading(false);
        // });
        return { request, cancel: () => controller.abort()}
    };

    delete(id: number) {
        return apiClient.delete(this.endpoint + "/" + id);
    };

    create<T>(entity: T) {
        return apiClient.post(this.endpoint, entity);
    };

    update<T extends Entity>(entity: T) {
        return apiClient.patch(this.endpoint + "/" + entity.id, entity);
    };

}

// export default new HttpService("/user");
const create = (endpoint: string) => new HttpService(endpoint);

export default create;
