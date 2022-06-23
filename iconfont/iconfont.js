Component({
  properties: {
    name: {
      type: String
    },
    color: {
      type: String
    },
    size: {
      type: Number,
      value: 18
    }
  },
  data: {
    svgStyle: ""
  },
  methods: {},
  lifetimes: {
    attached() {
      // console.log(this)
      const fs = wx.getFileSystemManager();
      try {
        const res = fs.readFileSync(
          `/static/icon/${this.data.name}.svg`,
          "utf8",
          0
        );
        // console.log(res)

        const svgStr = res.replaceAll("\n", "").match("<svg.*?/svg>")[0];
        const divideIndex = svgStr.indexOf(">");
        // console.log(divideIndex)
        // console.log(svgStr)
        let firstStr = svgStr.slice(0, divideIndex);
        let otherStr = svgStr.slice(divideIndex);
        // console.log(firstStr)
        // console.log(otherStr)

        // 根据size 修改height width
        const [heightString, heightValue] = firstStr.match(
          /height="(\d+(\.\d*|))(?:px|)"/
        );
        const [widthString, widthValue] = firstStr.match(
          /width="(\d+(\.\d*|))(?:px|)"/
        );
        // console.log(heightString,heightValue,widthString,widthValue)
        const finalHeight = this.data.size;
        const finalWidth = (widthValue / heightValue) * finalHeight;
        firstStr = firstStr
          .replace(widthString, `width="${finalWidth}px"`)
          .replace(heightString, `height="${finalHeight}px"`);

        if (this.data.color) {
          firstStr += ` fill="${this.data.color}"`;
          otherStr = otherStr.replaceAll(
            /fill="(.*?)"/g,
            `fill="${this.data.color}"`
          );
          otherStr = otherStr.replaceAll(/opacity="(.*?)"/g, "");
        }

        // console.log(firstStr+ otherStr)
        let clStr = (firstStr + otherStr)
          .replaceAll("<", "%3C")
          .replaceAll(">", "%3E")
          .replaceAll('"', `'`)
          .replaceAll("#", "%23");

        const resultStr = `background-image:url("data:image/svg+xml, ${clStr}");width:${finalWidth}px;height:${finalHeight}px`;
        this.setData({
          svgStyle: resultStr
        });
        // console.log(resultStr)
      } catch (e) {
        console.error(e);
      }
    }
  }
});
