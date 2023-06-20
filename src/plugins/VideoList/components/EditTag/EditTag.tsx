import { ITag } from '../../interface';
import { Card, Tag } from 'antd';

type EditTagProps = {
  tags: ITag[];
};

export function EditTag({ tags }: EditTagProps) {
  return (
    <div>
      {tags.map(({ content }) => {
        return <Tag key={content}>{content}</Tag>;
      })}
    </div>
  );
}
