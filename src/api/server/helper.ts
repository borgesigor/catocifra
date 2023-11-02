export class Loading{
  private timer: any

  start(){
    var h = ['\\', '|', '/', '-'];
    var i = 0;

    this.timer = 
    setInterval(() => {
      i = (i >= h.length) ? 0 : i;
      console.clear();
      console.log(h[i]);
      i++;
    }, 200);

  }

  stop(){
    console.clear();
    clearInterval(this.timer)
  }
}