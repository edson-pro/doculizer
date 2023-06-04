import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:5000/aoi",
});

class MockAdapter {
  query = {
    params: {
      limit: 20,
    },
    route: "",
  };
  constructor() {}
  clear() {
    this.query = {
      params: {
        limit: 20,
      },
      route: "",
    };
  }
  collection(name) {
    const newRoute = this.query.route + "/" + name;
    this.query["route"] = newRoute;
    return this;
  }

  where(field, operator: "==" | ">" | "<", value) {
    const operators = {
      "==": {
        [field]: value,
      },
      "<": {
        [field + "_lt"]: value,
      },
      ">": {
        [field + "_gt"]: value,
      },
    };

    this.query.params = { ...this.query.params, ...operators[operator] };
    return this;
  }

  limit(limit) {
    const newParams = { ...this.query.params, limit };
    this.query["params"] = newParams;
    return this;
  }

  doc(id: number | string) {
    const newRoute = this.query.route + "/" + id;
    this.query["route"] = newRoute;
    return this;
  }

  update(data) {
    return client
      .put(this.query.route, {
        ...data,
      })
      .then((e) => {
        return { data: "success" };
      })
      .catch((e) => {
        throw Error(e.message);
      })
      .finally(() => {
        this.clear();
      });
  }

  delete() {
    return client
      .delete(this.query.route)
      .then((e) => {
        return { data: "success" };
      })
      .catch((e) => {
        throw Error(e.message);
      })
      .finally(() => {
        this.clear();
      });
  }

  create(data) {
    return client
      .post(this.query.route, {
        ...data,
      })
      .then((e) => {
        return { data: "success" };
      })
      .catch((e) => {
        throw Error(e.message);
      })
      .finally(() => {
        this.clear();
      });
  }

  get() {
    return client
      .get(this.query.route, {
        params: this.query.params,
      })
      .then((e) => {
        return e.data;
      })
      .catch((e) => {
        throw Error(e.message);
      })
      .finally(() => {
        this.clear();
      });
  }
}

export default MockAdapter;
