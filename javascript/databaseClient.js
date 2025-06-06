const GROUP_NAME = "al3";
const PASSWORD   = "dbxcqrajxbwbyo6x";
const SERVER_URL = "https://ict-290.herokuapp.com/sql";

const dbClient = {
  executeSqlQuery: async (sql) => {
    const payload = { group: GROUP_NAME, pw: PASSWORD, sql: sql };
    try {
      const response = await fetch(SERVER_URL, {
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.error) console.error("DB‐Fehler:", result.error);
      return result;
    } catch (error) {
      console.error("DB error", error);
    }
  },

  insertInto: async (sqlTable, formData) => {
    const fields = Object.keys(formData);
    const values = Object.values(formData).map(val =>
      val === null || val === undefined ? "NULL" : `'${String(val).replace(/'/g, "''")}'`
    );
    const sql = `INSERT INTO ${sqlTable} (${fields.join(",")}) VALUES (${values.join(",")});`;

    try {
      return await dbClient.executeSqlQuery(sql);
    } catch (error) {
      console.error("Fehler beim INSERT:", error);
    }
  },

  query: async (sql, params) => {
    let finalSql = sql;
    params.forEach(val => {
      let replacement;
      if (val === null || val === undefined) {
        replacement = "NULL";
      } else {
        replacement = `'${String(val).replace(/'/g, "''")}'`;
      }
      finalSql = finalSql.replace("?", replacement);
    });
    return await dbClient.executeSqlQuery(finalSql);
  }
};