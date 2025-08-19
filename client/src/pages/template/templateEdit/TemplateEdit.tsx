/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Player } from '@remotion/player';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Sketch from '@uiw/react-color-sketch';
import { useState } from 'react';
import { format } from 'date-fns';
import { DynamicIcon } from 'lucide-react/dynamic';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { TemplateEditProps, WeddingDetails } from './TemplateEdit.types';
import { templateMap } from '@/remotion/Templates';
import { LoaderIcon } from 'lucide-react';

export const TemplateEdit = ({
  currentStep,
  setCurrentStep,
  weddingDetails,
  setWeddingDetails,
  selectedTemplate,
  audios,
  // selectedAudio,
  setSelectedAudio,
  audioUrl,
  templateDuration,
}: TemplateEditProps) => {
  const [colorPickerType, setColorPickerType] = useState<'primary' | 'secondary' | null>(null);

  const [date, setDate] = useState<Date | undefined>(new Date());

  const [playingUrl, setPlayingUrl] = useState('');
  const [loadingUrl, setLoadingUrl] = useState('');

  const {
    groomName,
    brideName,
    brideFamilyInfo,
    groomFamilyInfo,
    welcomeMessage,
    eventVenue,
    eventDate,
    templateColor,
  } = weddingDetails;

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      const formatted = format(selectedDate, 'd | MMMM | yyyy');
      setWeddingDetails((prev) => ({
        ...prev,
        eventDate: formatted,
      }));
    } else {
      setWeddingDetails((prev) => ({
        ...prev,
        eventDate: '',
      }));
    }
  };

  const handleColorChange = (color: any) => {
    setWeddingDetails((prev) => ({ ...prev, templateColor: color.hex }));
  };

  const handleChange =
    (key: keyof WeddingDetails) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setWeddingDetails((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
    };

  const handleSelect = (value: string) => {
    setSelectedAudio(value);
  };

  // const togglePlay = (id: string) => {
  //   const audioEl = document.getElementById(id) as HTMLAudioElement;
  //   if (!audioEl) return;

  //   if (playingUrl === id) {
  //     audioEl.pause();
  //     setPlayingUrl('');
  //   } else {
  //     document.querySelectorAll('audio').forEach((el) => el.pause());
  //     audioEl.play();
  //     setPlayingUrl(id);
  //   }
  // };
  const togglePlay = (id: string) => {
    const audioEl = document.getElementById(id) as HTMLAudioElement;
    if (!audioEl) return;

    if (playingUrl === id) {
      audioEl.pause();
      setPlayingUrl('');
    } else {
      document.querySelectorAll('audio').forEach((el) => el.pause());
      setLoadingUrl(id); // Show loader until it can play
      audioEl.play().catch(() => {
        setLoadingUrl('');
      });
    }
  };

  const SelectedComponent = templateMap[selectedTemplate];

  if (!SelectedComponent) {
    throw new Error(`Unknown template name: ${name}`);
  }

  return (
    <>
      <section className="bg-muted dark:bg-background py-5">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="flex flex-col gap-10 md:flex-row md:gap-16">
            <div className="md:w-1/3 flex justify-center md:block">
              <div className="sticky top-20">
                <Player
                  component={SelectedComponent}
                  durationInFrames={templateDuration}
                  compositionWidth={1080}
                  compositionHeight={1920}
                  fps={30}
                  style={{
                    width: 280,
                    height: 500,
                    borderRadius: '0.75rem',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  }}
                  controls
                  allowFullscreen={false}
                  hideControlsWhenPointerDoesntMove={1000}
                  inputProps={{
                    groomName: groomName,
                    brideName: brideName,
                    groomFamilyInfo: groomFamilyInfo,
                    brideFamilyInfo: brideFamilyInfo,
                    welcomeMessage: welcomeMessage,
                    eventDate: eventDate,
                    eventVenue: eventVenue,
                    color: templateColor,
                    audio: audioUrl,
                  }}
                />
              </div>
            </div>
            <div className="md:w-2/3">
              <Accordion type="single" collapsible className="w-full space-y-2" defaultValue="1">
                <AccordionItem
                  value="1"
                  className="bg-background shadow-xs rounded-lg border px-4 last:border-b"
                >
                  <AccordionTrigger className="cursor-pointer items-center py-5 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="flex size-6">
                        <DynamicIcon name="info" className="m-auto size-4" />
                      </div>
                      <span className="text-base">Edit Couple Information</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 flex flex-row items-center justify-center">
                    <div className="px-2">
                      <div className="border border-primary  rounded-xl bg-background p-6 shadow-sm">
                        <div className="flex flex-col gap-6 w-full">
                          {/* Groom Name */}
                          <div className="grid gap-3">
                            <Label
                              htmlFor="tabs-demo-name"
                              className="text-sm font-medium text-muted-foreground"
                            >
                              Groom Name
                            </Label>
                            <Input
                              id="tabs-demo-name"
                              value={groomName}
                              onChange={handleChange('groomName')}
                            />
                          </div>

                          {/* Font Size & Font Color */}
                          {/* <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Label
                                htmlFor="font-size"
                                className="text-sm font-medium text-muted-foreground"
                              >
                                Font Size
                              </Label>
                              <Input
                                id="font-size"
                                defaultValue={12}
                                type="number"
                                placeholder="Font size"
                                className="w-[100px]"
                              />
                            </div>
                          </div> */}

                          {/* Groom Message */}
                          <div className="grid gap-3">
                            <Label
                              htmlFor="msg"
                              className="text-sm font-medium text-muted-foreground"
                            >
                              Groom Family Info
                            </Label>
                            <Textarea
                              id="msg"
                              value={groomFamilyInfo}
                              onChange={handleChange('groomFamilyInfo')}
                              rows={1}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-2">
                      <div className="border border-primary rounded-xl bg-background p-6 shadow-sm">
                        <div className="flex flex-col gap-6 w-full">
                          <div className="grid gap-3">
                            <Label
                              htmlFor="tabs-demo-name"
                              className="text-sm font-medium text-muted-foreground"
                            >
                              Bride Name
                            </Label>
                            <Input
                              id="tabs-demo-name"
                              value={brideName}
                              onChange={handleChange('brideName')}
                            />
                          </div>

                          {/* <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Label
                                htmlFor="font-size"
                                className="text-sm font-medium text-muted-foreground"
                              >
                                Font Size
                              </Label>
                              <Input
                                id="font-size"
                                defaultValue={12}
                                type="number"
                                placeholder="Font size"
                                className="w-[100px]"
                              />
                            </div>
                          </div> */}

                          <div className="grid gap-3">
                            <Label
                              htmlFor="msg"
                              className="text-sm font-medium text-muted-foreground"
                            >
                              Bride Family Info
                            </Label>
                            <Textarea
                              id="msg"
                              value={brideFamilyInfo}
                              onChange={handleChange('brideFamilyInfo')}
                              rows={1}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="2"
                  className="bg-background shadow-xs rounded-lg border px-4 last:border-b"
                >
                  <AccordionTrigger className="cursor-pointer items-center py-5 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="flex size-6">
                        <DynamicIcon name="webhook" className="m-auto size-4" />
                      </div>
                      <span className="text-base">Event Information</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <div className="rounded-xl bg-background shadow p-6 flex flex-col gap-4">
                      {/* Wedding Date */}
                      <div className="grid gap-3">
                        <Label htmlFor="msg" className="text-sm font-medium text-muted-foreground">
                          Welcome Message
                        </Label>
                        <Textarea
                          id="msg"
                          rows={2}
                          value={welcomeMessage}
                          onChange={handleChange('welcomeMessage')}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="wedding-date"
                          className="text-sm font-medium text-muted-foreground"
                        >
                          Wedding/Event Date
                        </label>

                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              {date ? format(date, 'd | MMMM | yyyy') : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={handleDateSelect}
                              captionLayout="dropdown"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Venue */}
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="venue"
                          className="text-sm font-medium text-muted-foreground"
                        >
                          Venue
                        </label>
                        <Textarea
                          id="msg"
                          rows={2}
                          value={eventVenue}
                          onChange={handleChange('eventVenue')}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="3"
                  className="bg-background shadow-xs rounded-lg border px-4 last:border-b"
                >
                  <AccordionTrigger className="cursor-pointer items-center py-5 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="flex size-6">
                        <DynamicIcon name="settings" className="m-auto size-4" />
                      </div>
                      <span className="text-base">Design Settings</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-row items-center justify-evenly pb-6">
                    <div className="flex flex-row">
                      <Select onValueChange={handleSelect}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Audio" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {audios.map((audio) => {
                              const audioId = `audio-${audio.name}`;
                              return (
                                <div
                                  key={audio.name}
                                  className="flex items-center justify-between p-2 hover:bg-muted cursor-pointer rounded-md"
                                  onClick={() => handleSelect(audio.name)}
                                >
                                  <div>
                                    <SelectItem value={audio.name}>
                                      <div className="font-medium">{audio.name}</div>
                                    </SelectItem>
                                    <audio
                                      id={audioId}
                                      src={audio.url}
                                      preload="none"
                                      onCanPlay={() => {
                                        setPlayingUrl(audioId);
                                        setLoadingUrl('');
                                      }}
                                      onPlaying={() => {
                                        setLoadingUrl('');
                                      }}
                                      onPause={() => {
                                        if (playingUrl === audioId) setPlayingUrl('');
                                      }}
                                    />
                                  </div>
                                  <Button
                                    className="size-6 cursor-pointer"
                                    size="icon"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      togglePlay(audioId);
                                    }}
                                  >
                                    {loadingUrl === audioId ? (
                                      <LoaderIcon className="animate-spin" /> // your spinner icon
                                    ) : playingUrl === audioId ? (
                                      <DynamicIcon name="pause-circle" />
                                    ) : (
                                      <DynamicIcon name="play-circle" />
                                    )}
                                  </Button>
                                </div>
                              );
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-row ">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            // size="icon"
                            variant="ghost"
                            className="text-white"
                            style={{
                              backgroundColor: templateColor,
                            }}
                            onClick={() => setColorPickerType('primary')}
                          >
                            Choose Color
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto">
                          <Sketch
                            color={colorPickerType === 'primary' ? templateColor : ''}
                            onChange={handleColorChange}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
        <div className="flex justify-center space-x-10 mt-10">
          <Button
            variant="outline"
            className="w-32 cursor-pointer"
            onClick={() => setCurrentStep((prev) => prev - 1)}
            disabled={currentStep === 1}
          >
            Prev step
          </Button>
          <Button
            variant="outline"
            className="w-32 cursor-pointer"
            onClick={() => setCurrentStep((prev) => prev + 1)}
          >
            Next step
          </Button>
        </div>
      </section>

      {/* steps */}
    </>
  );
};
