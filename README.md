**Readme para FormJS**

FormJS es una pequeña y liviana librería de JavaScript para facilitar la validación y gestión de formularios en aplicaciones web.

# Uso

## Inicialización

Para utilizar FormJS, primero debes importarlo en tu script y luego inicializar un objeto de formulario utilizando la función `Form()`:

```javascript
import { Form } from "https://cdn.devetty.es/FormJS/js";

const form = Form({
  campo1: null,
  campo2: null,
  // Agrega más campos aquí según tu formulario
});
```

## Validaciones

Puedes agregar validaciones a tus campos de formulario utilizando los métodos proporcionados por FormJS. Por ejemplo, para hacer que un campo sea obligatorio, puedes usar `setRequired(true)`:

```javascript
form.campo1.setRequired(true);
```

FormJS también proporciona métodos para validar todo el formulario:

```javascript
if (form.validate()) {
  // OK
} else {
  // KO
}
```

## Convertir a objeto normal

Puedes obtener los valores del formulario como un objeto JavaScript normal utilizando el método `values()`:

```javascript
const formData = form.values();
console.log("Valores del formulario:", formData);
```

## Ejemplo

```html
<style>
  label.error span {
    color: red;
  }
</style>
<script type="module">
  import { Form } from "https://cdn.devetty.es/FormJS/js";

  const form = Form({
    titulo: null,
  });
  form.titulo.setRequired(true);

  const label = document.createElement("label");
  label.setAttribute("id", `label_${form.titulo.uuid}`);
  const span = document.createElement("span");
  span.innerText = "Título";
  label.appendChild(span);
  const input = document.createElement("input");
  input.onchange = ({ target }) => {
    form.titulo.value = target.value;
  };
  label.appendChild(input);
  const button = document.createElement("button");
  button.innerText = "Guardar";
  button.onclick = () => {
    if (!form.validate()) return;
    console.log(form.values());
  };
  document.body.appendChild(label);
  document.body.appendChild(button);
</script>
```
