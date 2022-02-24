import React from "react";
import { Text } from "pinus-ui-library";
import ContentCard from "./ContentCard";
import styles from "./styles.module.css";
import { LocalKudo } from "src/utils/contentful/types";

function reorder(original: LocalKudo[]): LocalKudo[][] {
  // LocalKudo divided into 3 roughly equal columns
  const ans = [[], [], []];

  // Current estimate of column length
  const lengths = [0, 0, 0];

  for (let i = 0; i < original.length; i++) {
    const height =
      original[i].image === null
        ? 0
        : original[i].image.fields.file.details.image.height;
    const width =
      original[i].image === null
        ? 0
        : original[i].image.fields.file.details.image.width;
    const weighted_height =
      original[i].image === null ? 0 : (height / width) * 12;

    // Find which column is minimum
    const minimum = Math.min(...lengths);
    const which_col = lengths.indexOf(minimum);

    // Updating the length estimates
    lengths[which_col] =
      lengths[which_col] +
      Math.floor(original[i].text.length / 60) +
      5 +
      weighted_height;

    // Putting the new LocalKudo into the correct column
    ans[which_col] = ans[which_col].concat(original[i]);
  }
  return ans;
}

const KudosContent = (props) => {
  const Kudos: LocalKudo[] = props.kudos.contents;
  const hasKudos = Kudos !== undefined;

  const Kudos_reordered = hasKudos ? reorder(Kudos) : null;

  let name: string = props.person as string;
  name = name
    .split("-")
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");

  return (
    <>
      {hasKudos && (
        <div className={styles.container}>
          {Kudos_reordered.map((column) => (
            <div className={styles.column}>
              {column.map((kudo) => {
                console.log(kudo);
                return (
                  <div className={styles.kudo}>
                    <ContentCard
                      description={kudo.text}
                      from={kudo.writer}
                      image={kudo.imageUrl}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
      {!hasKudos && (
        <div className={styles.container}>
          <ContentCard
            description={
              name +
              " has not gotten any well wishes. Be the first to send your well wishes to " +
              name +
              "!"
            }
            from="admin"
          />
        </div>
      )}
    </>
  );
};
export default KudosContent;
