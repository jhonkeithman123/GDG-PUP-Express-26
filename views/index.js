// Client-side todo app: fetches from /todos and allows create/update/delete
const api = {
  list: () => fetch("/todos").then((r) => r.json()),
  create: (task) =>
    fetch("/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task }),
    }).then((r) => r.json()),
  patch: (id, body) =>
    fetch(`/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((r) => r.json()),
  del: (id) =>
    fetch(`/todos/${id}`, { method: "DELETE" }).then((r) => r.json()),
};

const qs = (s, el = document) => el.querySelector(s);
const qsa = (s, el = document) => Array.from(el.querySelectorAll(s));

async function fetchAndRender() {
  const todos = await api.list().catch(() => []);
  const list = qs("#todoList");
  list.innerHTML = "";
  if (!todos.length) {
    list.innerHTML = '<li class="empty">No todos yet — add one above!</li>';
    return;
  }

  todos.forEach((t) => {
    const li = document.createElement("li");
    li.className = "todo-item";

    const left = document.createElement("div");
    left.className = "todo-left";

    const chk = document.createElement("input");
    chk.type = "checkbox";
    chk.checked = !!t.done;
    chk.addEventListener("change", async () => {
      await api.patch(t.id, { done: chk.checked }).catch(() => {});
      li.classList.toggle("done", chk.checked);
    });

    const text = document.createElement("div");
    text.className = "todo-text";
    text.textContent = t.task;
    if (t.done) li.classList.add("done");

    left.appendChild(chk);
    left.appendChild(text);

    const actions = document.createElement("div");
    actions.className = "todo-actions";

    const del = document.createElement("button");
    del.className = "btn ghost";
    del.textContent = "Delete";
    del.addEventListener("click", async () => {
      await api.del(t.id).catch(() => {});
      fetchAndRender();
    });

    actions.appendChild(del);

    li.appendChild(left);
    li.appendChild(actions);
    list.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const form = qs("#todoForm");
  const input = qs("#todoInput");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const val = input.value && input.value.trim();
    if (!val) return;
    await api.create(val).catch(() => {});
    input.value = "";
    fetchAndRender();
  });

  // initial load
  fetchAndRender();

  // menu toggle (small screens)
  const menuToggle = qs("#menuToggle");
  const nav = qs("#nav");
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => nav.classList.toggle("hidden"));
  }
});
