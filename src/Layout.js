class Layout {
  static render(layoutHbs, node, data) {
    const markup = layoutHbs(data);
    node.innerHTML = markup;
  }
}
export default Layout;
