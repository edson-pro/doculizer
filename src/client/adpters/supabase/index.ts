import supabase from "../../lib/supabase";
import AuthAdapter from "./auth";

function convertArrayToJson(arr) {
  return `{${arr.map((e) => `"${e}"`).join(",")}}`;
}

class SuperbaseAdapter {
  table;
  docId;
  limitCount = 20;
  conditions = [];
  searchQ;
  orders = [];
  pagination = { from: 0, to: 0 };
  page;
  joins = [];
  constructor() {}

  clear() {
    this.table = undefined;
    this.docId = undefined;
    this.limitCount = 20;
    this.searchQ = {};
    this.orders = [];
    this.conditions = [];
    this.pagination = { from: 0, to: 0 };
    this.page = 0;
    this.joins = [];
  }
  collection(name) {
    this.table = name;
    return this;
  }
  auth() {
    return new AuthAdapter();
  }

  where(field, operator: "==" | ">" | "<" | "in" | "contains", value) {
    this.conditions.push({ field, operator, value });
    return this;
  }

  limit(limit) {
    this.limitCount = limit;
    return this;
  }

  with(table, conditons) {
    this.joins.push({
      table: table,
    });
    conditons.forEach((e) => {
      this.conditions.push({
        field: `${table + "." + e.field}`,
        operator: e.operator,
        value: e.value,
      });
    });
    return this;
  }

  doc(id: number | string) {
    this.docId = id;
    return this;
  }

  search(col, text) {
    this.searchQ = {
      text: text,
      column: col,
    };
    return this;
  }

  paginate(page, size) {
    const from = page ? (page - 1) * size : 1;
    const to = page ? from + size - 1 : size;
    this.pagination = { from, to };
    this.limitCount = size;
    this.page = page;
    return this;
  }

  orderBy(col, by: "asc" | "desc") {
    this.orders.push({ column: col, by });
    return this;
  }

  update(doc) {
    return supabase
      .from(this.table)
      .update(doc)
      .eq("id", this.docId)
      .select("*")
      .single()
      .then(({ error, data }) => {
        this.clear();
        if (error) throw Error(error.message);
        return data;
      });
  }

  delete() {
    const q = supabase.from(this.table).delete();

    if (this.docId) q.eq("id", this.docId);
    if (this.conditions.length) {
      this.conditions.forEach((e) => {
        if (e.operator === "==") q.eq(e.field, e.value);
      });
    }

    return q.then(({ error, data }) => {
      this.clear();
      if (error) throw Error(error.message);
      return data;
    });
  }

  create(data) {
    const q = supabase
      .from(this.table)
      .insert(data)
      .select(this.joins.length ? this.getJoins() : "*");

    if (!Array.isArray(data)) {
      q.single();
    }

    return q.then(({ error, data }) => {
      this.clear();
      if (error) throw Error(error.message);
      return data;
    });
  }

  getJoins() {
    return `*,${` `}${this.joins
      .map((e) => e.table + (this.searchQ?.text ? "!inner" : "") + "(*)")
      .join(",")}`;
  }

  get({ count: returnCount }: any = {}) {
    const q = supabase
      .from(this.table)
      .select(
        this.joins.length ? this.getJoins() : "*",
        this.page || returnCount
          ? { count: "estimated", head: returnCount }
          : {}
      );

    this.conditions.forEach((e) => {
      if (e.operator === "==") q.eq(e.field, e.value);
      if (e.operator === "<") q.lt(e.field, e.value);
      if (e.operator === ">") q.gt(e.field, e.value);
      if (e.operator === "!=") q.neq(e.field, e.value);
      if (e.operator === "in") q.neq(e.field, e.value);
      if (e.operator === "contains")
        q.filter(e.field, "cs", convertArrayToJson(e.value));
    });

    this.orders.forEach((e) => {
      const values = {
        asc: true,
        desc: false,
      };
      if (e.column) q.order(e.column, { ascending: values[e.by] });
    });

    console.log(q);

    if (this.searchQ?.text)
      q.textSearch(this.searchQ.column, this.searchQ.text, {
        type: "phrase",
        config: "english",
      });

    if (this.docId) q.eq("id", this.docId).limit(1).single();

    if (this.pagination.from && this.pagination.to)
      q.range(this.pagination.from, this.pagination.to);

    if (this.limitCount) q.limit(this.limitCount);

    if (!this.orders.length) q.order("created_at", { ascending: false });

    this.clear();

    return q.then(async ({ error, data, count }) => {
      if (error) {
        this.clear();
        throw new Error(error.message);
      }
      const res = this.page
        ? { total: count, data: data, page: this.page }
        : returnCount
        ? count
        : data;
      this.clear();
      return res;
    });
  }
}

export default SuperbaseAdapter;
