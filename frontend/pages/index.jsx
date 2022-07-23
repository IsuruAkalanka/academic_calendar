import { Menu, Transition } from '@headlessui/react'
import { DotsVerticalIcon } from '@heroicons/react/outline'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from 'date-fns'
import { Fragment, useState, useEffect } from 'react'
import axios from 'axios'

const meetings = [
  {
    id: 1,
    name: 'Leslie Alexander',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2022-05-11T13:00',
    endDatetime: '2022-05-11T14:30',
  },
  {
    id: 2,
    name: 'Michael Foster',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2022-05-20T09:00',
    endDatetime: '2022-05-20T11:30',
  },
  {
    id: 3,
    name: 'Dries Vincent',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2022-05-20T17:00',
    endDatetime: '2022-05-20T18:30',
  },
  {
    id: 4,
    name: 'Leslie Alexander',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2022-07-28T07:45:18.225Z',
    endDatetime: '2022-06-09T14:30',
  },
  {
    id: 5,
    name: 'Michael Foster',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2022-07-13T14:00',
    endDatetime: '2022-05-13T14:30',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(async () => {
    setLoading(true)
    await axios.get('http://localhost:3001/events').then((data) => {
      setData(data.data)
      setLoading(false)
    })
    console.log(data)
  }, [])
  let today = startOfToday()
  let [selectedDay, setSelectedDay] = useState(today)
  let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
  let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  })

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }
  let selectedDayMeetings
  if (data !== undefined && data !== null) {
    selectedDayMeetings = data.filter((data) => {
      if (isSameDay(parseISO(data.startDate), selectedDay)) {
        return data.startDate
      }
    })
  }

  return (
    <div className="container pt-16">
      <div className="max-w-xl px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6 ">
        <div className="gap-4 md:grid md:grid-cols-7">
          <section className="col-span-2 border-2 border-gray-400 rounded-lg ">
            <div className="m-4">
              {/* <h2 className="flex justify-center font-bold text-gray-900 ">
              Events category
            </h2> */}
              <div className="flex mt-5">
                <div className="w-6 h-6 mx-auto mt-1 border-2 border-orange-500 rounded-full"></div>
                <div className="inline-block w-3/4 py-1 text-xs ">
                  Dead week
                </div>
              </div>
              <div className="flex mt-1">
                <div className="w-6 h-6 mx-auto mt-1 border-2 border-blue-500 rounded-full"></div>
                <span className="flex w-3/4 py-1 text-xs">Examination</span>
              </div>
              <div className="flex mt-1">
                <div className="w-6 h-6 mx-auto mt-1 border-2 border-green-500 rounded-full"></div>
                <span className="flex w-3/4 py-1 text-xs">Vacation</span>
              </div>
              <div className="flex mt-1">
                <div className="w-6 h-6 mx-auto mt-1 border-2 border-black rounded-full"></div>
                <span className="flex w-3/4 py-1 text-xs">
                  Industrial training special 1
                </span>
              </div>
              <div className="flex mt-1">
                <div className="w-6 h-6 mx-auto mt-1 border-2 border-gray-500 rounded-full"></div>
                <span className="flex w-3/4 py-1 text-xs">
                  Industrial training special 2
                </span>
              </div>
              <div className="flex mt-1">
                <div className="w-6 h-6 mx-auto mt-1 border-2 border-red-500 rounded-full"></div>
                <span className="flex w-3/4 py-1 text-xs">
                  Final exam ending week
                </span>
              </div>
              <div className="flex mt-1">
                <div className="w-6 h-6 mx-auto mt-1 border-2 border-yellow-500 rounded-full"></div>
                <span className="flex w-3/4 py-1 text-xs">Survey camp</span>
              </div>
              <div className="flex mt-1">
                <div className="w-6 h-6 mx-auto mt-1 border-2 border-pink-500 rounded-full"></div>
                <span className="flex w-3/4 py-1 text-xs">
                  Soft skill development pro
                </span>
              </div>
              <div className="flex mt-1">
                <div className="w-6 h-6 mx-auto mt-1 border-2 border-orange-900 rounded-full"></div>
                <span className="flex w-3/4 py-1 text-xs">
                  General elective special
                </span>
              </div>
              <div className="flex mt-1">
                <div className="w-6 h-6 mx-auto mt-1 border-2 border-purple-500 rounded-full"></div>
                <span className="flex w-3/4 py-1 text-xs">Online classes</span>
              </div>
            </div>
          </section>
          <section className="col-span-3 mt-6 border-2 border-gray-400 rounded-lg bg-slate-100 md:mt-0">
            <div className="flex justify-between">
              <button
                type="button"
                onClick={previousMonth}
                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
              </button>

              <h2 className="font-semibold text-gray-900 ">
                {format(firstDayCurrentMonth, 'MMMM yyyy')}
              </h2>

              <button
                onClick={nextMonth}
                type="button"
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="grid grid-cols-7 mt-2 text-sm">
              {days.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    'py-1.5'
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={classNames(
                      isEqual(day, selectedDay) && 'text-white',
                      !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        'text-red-500',
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-900',
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-400',
                      isEqual(day, selectedDay) && isToday(day) && 'bg-red-500',
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        'bg-gray-900',
                      !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        'font-semibold',
                      meetings.some((meeting) =>
                        isSameDay(parseISO(meeting.startDatetime), day)
                      ) && 'solid border-2 border-blue-500',
                      'solid day-btn mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                    )}
                  >
                    <time dateTime={format(day, 'yyyy-MM-dd')}>
                      {format(day, 'd')}
                    </time>
                  </button>

                  {/* <div className="w-1 h-1 mx-auto mt-1">
                    {meetings.some((meeting) =>
                      isSameDay(parseISO(meeting.startDatetime), day)
                    ) && (
                      
                    )}
                  </div> */}
                </div>
              ))}
            </div>
          </section>
          <section className="col-span-2 mt-6 border-2 border-gray-400 rounded-lg md:mt-0">
            <h2 className="font-semibold text-gray-900">
              Schedule for{' '}
              <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                {format(selectedDay, 'MMM dd, yyy')}
              </time>
            </h2>
            <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
              {data !== undefined &&
              data !== null &&
              selectedDayMeetings.length > 0 ? (
                selectedDayMeetings.map((data) => (
                  <Meeting data={data} key={data._id} />
                ))
              ) : (
                <p>No meetings for today.</p>
              )}
            </ol>
          </section>
        </div>
      </div>
    </div>
  )
}

function Meeting({ data }) {
  let startDate = parseISO(data.startDate)
  let endDate = parseISO(data.endDate)

  return (
    <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
      {/* <img
        src={meeting.imageUrl}
        alt=""
        className="flex-none w-10 h-10 rounded-full"
      /> */}
      <div className="flex-auto">
        <p className="text-gray-900">{data.title}</p>
        <p className="mt-0.5">
          <time dateTime={data.startDate}>{format(startDate, 'h:mm a')}</time> -{' '}
          <time dateTime={data.endDate}>{format(endDate, 'h:mm a')}</time>
        </p>
      </div>
      <Menu
        as="div"
        className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
      >
        <div>
          <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
            <span className="sr-only">Open options</span>
            <DotsVerticalIcon className="w-6 h-6" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Edit
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Cancel
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </li>
  )
}

let colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
]