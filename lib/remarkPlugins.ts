import { visit } from 'unist-util-visit';

export function remarkSubTitle() {
  return (tree: any) => {
    visit(tree, 'paragraph', (node: any, index: number, parent: any) => { //visitがエラーだけどこれ関係ない？
      if (!node.children) return;

      // 子ノードの中に &&text&& を含むテキストがあるか確認
      const newChildren = node.children.flatMap((child: any) => {
        if (child.type === 'text') {
          const parts = child.value.split(/(&&[^&]+&&)/g); // &&で分割（囲み含む）
          return parts.map((part: string) => {
            const match = part.match(/^&&([^&]+)&&$/);
            if (match) {
              return {
                type: 'heading',
                depth: 3,
                children: [{ type: 'text', value: match[1] }],
              };
            } else {
              return {
                type: 'text',
                value: part,
              };
            } //generateStaticParams
          });
        }
        return [node];
      });

      if (newChildren.length > 1) {
        // 現在の paragraph を削除して新しいノードを挿入
        parent.children.splice(index, 1, ...newChildren);
      }
    });
  };
}
