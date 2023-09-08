import React from "react";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { Modal, type SelectOption } from "@ltopx/lx-ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Icon from "@/components/icon";
import MenuIcon from "@/components/menu/icon";
import type { Character } from "@/lib/character";
import { useCharacterStore } from "@/hooks/useCharacter";

interface ICharacter {
  name: Character["name"];
  icon: Character["icon"];
  desc: Character["desc"];
  content: Character["content"];
  welcome: Character["welcome"];
  model_config: Character["model_config"];
}

const options: SelectOption[] = [
  {
    label: "RiChatSmile2Line",
    value: "RiChatSmile2Line",
  },
  {
    label: "HiOutlineTranslate",
    value: "HiOutlineTranslate",
  },
  {
    label: "FaBook",
    value: "FaBook",
  },
  {
    label: "MdMovieEdit",
    value: "MdMovieEdit",
  },
  {
    label: "AiFillAlert",
    value: "AiFillAlert",
  },
  {
    label: "BsVectorPen",
    value: "BsVectorPen",
  },
  {
    label: "TbSailboat",
    value: "TbSailboat",
  },
  {
    label: "BsCodeSlash",
    value: "BsCodeSlash",
  },
  {
    label: "AngelFill",
    value: "AngelFill",
  },
  {
    label: "UnlockLine",
    value: "UnlockLine",
  },
  {
    label: "DocumentLine",
    value: "DocumentLine",
  },
  {
    label: "GameLine",
    value: "GameLine",
  },
];

const CreateCharacter = React.forwardRef((_, forwardedRef) => {
  const tGlobal = useTranslations("global");
  const tCharacter = useTranslations("character");

  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState<ICharacter>({
    name: "",
    icon: "RiChatSmile2Line",
    desc: "",
    content: "",
    welcome: "",
    model_config: {
      model_type: "openai",
      model_name: "gpt-3.5-turbo-16k",
      context_length: 8,
    },
  });

  const nameRef = React.useRef<any>(null);
  const descRef = React.useRef<any>(null);
  const contentRef = React.useRef<any>(null);

  const onClose = () => setOpen(false);

  const onChangeForm = (value: any, key: keyof ICharacter) => {
    setFormData((data: ICharacter) => {
      const newData = JSON.parse(JSON.stringify(data));
      newData[key] = value;
      return newData;
    });
  };

  const addList = useCharacterStore((state) => state.addList);

  const onOk = () => {
    if (!formData.name) {
      nameRef.current?.focus();
      return toast.error(tGlobal("please-enter"), {
        id: "enter-name",
      });
    }
    if (!formData.desc) {
      descRef.current?.focus();
      return toast.error(tGlobal("please-enter"), { id: "enter-desc" });
    }
    if (!formData.content) {
      contentRef.current?.focus();
      return toast.error(tGlobal("please-enter"), { id: "enter-content" });
    }
    const params: Character = {
      id: uuidv4(),
      icon: formData.icon,
      type: "mine",
      handle_type: "text",
      name: formData.name,
      desc: formData.desc,
      content: formData.content,
      welcome: formData.welcome,
      model_config: {
        model_type: "openai",
        model_name: "gpt-3.5-turbo-16k",
        context_length: 8,
      },
    };
    addList(params);
    toast.success(tGlobal("operation-successful"));
    setOpen(false);
  };

  React.useImperativeHandle(forwardedRef, () => ({
    init() {
      setFormData({
        name: "",
        icon: "RiChatSmile2Line",
        desc: "",
        content: "",
        welcome: "",
        model_config: {
          model_type: "openai",
          model_name: "gpt-3.5-turbo-16k",
          context_length: 8,
        },
      });
      setOpen(true);
    },
  }));

  return (
    <Modal
      title={tGlobal("create")}
      open={open}
      maskClosable={false}
      okText={tGlobal("ok-spacing")}
      cancelText={tGlobal("cancel-spacing")}
      onClose={onClose}
      onOk={onOk}
    >
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">{tGlobal("name")}</Label>
          <Input
            id="name"
            ref={nameRef}
            placeholder={tGlobal("please-enter")}
            maxLength={40}
            value={formData.name}
            onChange={(e) => onChangeForm(e.target.value, "name")}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="icon">{tGlobal("icon")}</Label>
          <Select
            value={formData.icon}
            onValueChange={(value) => onChangeForm(value, "icon")}
          >
            <SelectTrigger id="icon">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper" className="max-h-[300px]">
              {options.map((row) => (
                <SelectItem key={row.value} value={row.value}>
                  <div className="flex gap-2 items-center">
                    <MenuIcon className="" name={row.value} />
                    <span>{row.value}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="desc">{tGlobal("desc")}</Label>
          <Textarea
            id="desc"
            ref={descRef}
            placeholder={tGlobal("please-enter")}
            maxLength={40}
            value={formData.desc}
            onChange={(e) => onChangeForm(e.target.value, "desc")}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="content">Prompt {tGlobal("content")}</Label>
          <Textarea
            id="content"
            ref={contentRef}
            placeholder={tGlobal("please-enter")}
            value={formData.content}
            onChange={(e) => onChangeForm(e.target.value, "content")}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="welcome" className="flex items-center gap-2">
            {tCharacter("welcome-message")}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Icon icon="question_line" size={18} />
                </TooltipTrigger>
                <TooltipContent>
                  {tCharacter("welcome-message-tip")}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <Textarea
            id="welcome"
            placeholder={tGlobal("please-enter")}
            value={formData.welcome}
            onChange={(e) => onChangeForm(e.target.value, "welcome")}
          />
        </div>
      </div>
    </Modal>
  );
});

CreateCharacter.displayName = "CreateCharacter";

export default CreateCharacter;
