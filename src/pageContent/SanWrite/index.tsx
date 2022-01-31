import React, { useState } from "react";

import { getPersons, createContent } from "src/utils/contentful/kudo";

import { Dropdown, Text, Button, Input, TextArea } from "pinus-ui-library";

const SanWriteContent: React.FC = () => {
  const [persons, setPersons] = useState<Array<string>>();
  const [recipient, setRecipient] = useState<string>("");
  const [writer, setWriter] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  React.useEffect(() => {
    async function getData() {
      const res = await getPersons();

      setPersons(res);
    }
    getData();
  }, []);

  type entry = {
    label: string;
    value: string;
  };

  async function handleSubmit() {
    if (recipient && writer && content) {
      await createContent(content, recipient, writer);
      setMessage("Message successfully posted");
    } else {
      setMessage("All fields must be filled in");
    }
  }

  return (
    <div className={`flex flex-col items-center w-95vw`}>
      <p>&nbsp;</p>
      <Text fontSize="xl"> Recipient </Text>
      <Dropdown
        onChange={(option: entry) => {
          option && setRecipient(option.label);
        }}
        isMulti={false}
        options={
          persons &&
          persons.map((entry) => {
            return {
              label: entry,
              value: entry,
            };
          })
        }
        placeholder="Recipient"
      />
      <p>&nbsp;</p>
      <Text fontSize="xl"> Your message </Text>
      <TextArea
        value={content || ""}
        placeholder="Your message"
        onChange={(event) => setContent(event.target.value)}
      />
      <p>&nbsp;</p>
      <Text fontSize="xl"> Your name </Text>
      <Input
        value={writer || ""}
        placeholder="Your name"
        onChange={(event) => setWriter(event.target.value)}
      />
      <p>&nbsp;</p>
      <Button onClick={handleSubmit} label="Submit" variant="secondary" />
      <Text color="red">{message}</Text>
    </div>
  );
};

export default SanWriteContent;
