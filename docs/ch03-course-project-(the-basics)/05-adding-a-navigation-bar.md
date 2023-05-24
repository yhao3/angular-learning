# 05. Adding a Navigation Bar

- [`header.component.html`](../../course-project-1/src/app/header/header.component.html)

```html
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <a href="#" class="navbar-brand">Recipe Book</a>
    </div>

    <div class="collapse navbar-collapse">
      <ul class="nav navbar-nav">
        <li><a href="#">Recipes</a></li>
        <li><a href="#">Shopping List</a></li>
      </ul>
      <ul class="nav navbarnav navbar-right">
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" role="button">Manage <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="#">Save Data</a></li>
            <li><a href="#">Fetch Data</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
```

現在我們有了 navigation bar 與一個下拉選單。

但如果我們點擊下拉選單，它是不起作用的，因為我們還沒有添加任何程式碼來打開下拉選單。 我們會在指令部分實作這個！