class FormHandler {
  constructor(endpoint) {
    this.btnShow = document.getElementById("btnShow");
    this.btnClear = document.getElementById("btnClear");
    this.endpoint = endpoint;

    this.userName = null;
    this.resultFromAPI = null;
    this.resultFromAPIrepos = null;

    this.resultToShowOnPage = null;
    this.initialization();
  }

  initialization() {
    this.btnShow.addEventListener("click", () => this.handlerBtnShow());
    this.btnClear.addEventListener("click", () => this.handlerBtnClear());
  }

  async handlerBtnShow() {
    this.userName = document.getElementById("input").value;

    this.resultFromAPI = await fetch(`${this.endpoint}${this.userName}`).then(
      (response) => response.json()
    );

    this.resultFromAPIrepos = await fetch(
      `${this.endpoint}${this.userName}/repos`
    ).then((response) => response.json());

    if (this.resultFromAPI && this.resultFromAPIrepos) {
      this.showResult();
    }
  }

  handlerBtnClear() {
    this.userName = null;
    this.resultFromAPI = null;
    this.resultFromAPIrepos = null;
    this.resultToShowOnPage = null;

    document.querySelector("#result").innerHTML = "";
  }

  showResult() {
    document.querySelector("#result").innerHTML = "";
    this.resultToShowOnPage = document.createElement("div");

    const logo = document.createElement("img");
    logo.setAttribute("src", this.resultFromAPI.avatar_url);
    const name = document.createElement("p");
    name.innerHTML = `Nazwa: ${this.resultFromAPI.login}`;
    const titleOverList = document.createElement("p");
    titleOverList.innerHTML = `Repozytoria`;
    const list = document.createElement("ul");

    this.resultFromAPIrepos.map((el) => {
      const listItem = document.createElement("li");
      const listItemLink = document.createElement("a");
      listItemLink.setAttribute("href", el.git_url);
      listItemLink.setAttribute("target", "blank");
      listItemLink.innerText = el.name;

      listItem.appendChild(listItemLink);
      list.appendChild(listItem);
    });

    this.resultToShowOnPage.appendChild(logo);
    this.resultToShowOnPage.appendChild(name);
    this.resultToShowOnPage.appendChild(titleOverList);
    this.resultToShowOnPage.appendChild(list);

    document.querySelector("#result").appendChild(this.resultToShowOnPage);

    console.log(this.resultFromAPIrepos);
  }
}
